import Bytez from 'bytez.js';

// insert your key
// const sdk = new Bytez(process.env.BYTEZ_KEY);

// // choose your model
// const model = sdk.model('Qwen/Qwen3-4B');

// // provide the model with input
// const input = [
//   {
//     "role": "system",
//     "content": "You are a friendly Cat chatbot"
//   },
//   {
//     "role": "assistant",
//     "content": "Hello, I'm a friendly bot"
//   },
//   {
//     "role": "user",
//     "content": "Gemini vs you who is more genuis ai"
//   }
// ];

// // set streaming to "true"
// const stream = true;

// // send to the model
// const readStream = await model.run(input, stream);

// let text = '';

// for await (const tokens of readStream) {
//   text += tokens;

//   console.log(tokens);
// }

// // observe the output
// console.log({ text });








const key = process.env.BYTEZ_KEY
const sdk = new Bytez(key)

// choose gpt-4o-mini
const model = sdk.model("openai/gpt-4o-mini")

// send input to model
const { error, output } = await model.run([
  {
    "role": "user",
    "content": 'hi Gbt'
  }
])

console.log(output);