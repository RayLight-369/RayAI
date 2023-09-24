import openai from "openai";

const AI = new openai( {
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  organization: process.env.NEXT_PUBLIC_OPENAI_ORG,
  dangerouslyAllowBrowser: true,
} );

export default AI;