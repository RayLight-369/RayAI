import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_KEY;

export const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false }
});



export const getData = async ({
  table,
  range,
  columns = [],
  where = {},
  contains = {},
  orderBy = {
    property: 'id',
    ascending: false
  }
}) => {

  try {

    if (Array.isArray(columns)) {
      columns = columns.join(",");
    }

    let Data = supabase
      .from(table)
      .select(columns)
      .match(where)
      .order(orderBy.property, { ascending: orderBy.ascending });

    if (range && range.length === 2) {
      Data.range(range[0], range[1]);
    }

    if (Object.keys(contains).length) {
      for (let key in contains) {
        Data.ilike(key, `%${contains[key].join("%")}%`);
      }
    }

    Data = await Data;

    return { data: Data.data, statusText: Data.statusText, error: Data.error };

  } catch (error) {

    console.log(error);

  }

  return false;

};

export const insertData = async ({
  table,
  object
}) => {

  try {

    const { data, error, statusText } = await supabase
      .from(table)
      .insert(object)
      .select();

    return { data, error, statusText };

  } catch (error) {

    console.log(error);

  }

  return false;

};

export const updateData = async ({
  table,
  object,
  where
}) => {

  try {

    let Data = await supabase
      .from(table)
      .update(object)
      .match(where);


    return Data.data;

  } catch (error) {

    console.log(error);

  }

  return false;

};

export const exists = async ({
  table,
  where,
  columns = []
}) => {
  try {

    if (Array.isArray(columns)) {
      columns = columns.join(",");
    }

    let { data, error } = await supabase
      .from(table)
      .select(columns)
      .match(where);

    return !!data.length;

  } catch (e) {
    console.log(e);
  }

  return false;
};

export const deleteData = async ({
  table,
  where,
}) => {
  try {
    const { data, error, statusText } = await supabase
      .from(table)
      .delete()
      .match(where);

    return { data, error, statusText };
  } catch (e) {
    console.log(e);
  }

  return false;
};

export const uploadFile = async (userID, postID, id, file) => {

  try {

    supabase.storage
      .from("images")
      .upload(`users/${userID}/${postID}/${id}`, file, {
        cacheControl: '3600',
        upsert: false
      }).then(console.log);

  } catch (e) {

    console.log(e);

  }

};

export const getFile = (FolderPath, id) => {

  let { data: { publicUrl: src } } = supabase.storage.from(`images/${FolderPath}`).getPublicUrl(id);

  return src;

};

export const deleteFile = async (path) => {

  let { data } = await supabase.storage.from(`images`).remove([`${path}`]);

  return data;

};

export const deleteAllFiles = async (FolderPath) => {
  let { data: list } = await supabase.storage.from(`images`).list(FolderPath);
  const filesToDelete = list.map(file => `${FolderPath}/${file.name}`);
  const { data, error } = await supabase.storage.from("images").remove(filesToDelete);
  return data;
};