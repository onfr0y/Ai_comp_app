
class Prompt {
    constructor(prompt) {
      if (!prompt) {
        throw new Error('Prompt text is required.');
      }
      this.prompt = prompt;
      this.createdAt = new Date(); // Manually create a timestamp
    }
  }

 
export default ('Prompt');