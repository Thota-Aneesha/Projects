from fastapi import FastAPI, HTTPException, File, UploadFile, Form
from fastapi.middleware.cors import CORSMiddleware
import openai
import os
from dotenv import load_dotenv
import logging

# Load environment variables from a .env file
load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Create an instance of the FastAPI class
app = FastAPI()

# Add CORS middleware to allow cross-origin requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load the OpenAI API key from an environment variable
openai.api_key = os.getenv("OPENAI_API_KEY")

# Define a root endpoint that returns a welcome message
@app.get("/")
async def root():
    return {"message": "Welcome to the ChatGPT Clone API"}

# Define a chat endpoint that interacts with the OpenAI API
@app.post("/chat")
async def chat(question: str = Form(...), file: UploadFile = File(None)):
    try:
        # Log the received question and file
        logger.info(f"Received question: {question}")
        if file:
            logger.info(f"Received file: {file.filename}")
        
        # Create a completion request to the OpenAI API
        response = openai.Completion.create(
            engine="gpt-3.5-turbo",  # Updated engine name
            prompt=question,
            max_tokens=150
        )
        # Extract the reply from the response
        reply = response.choices[0].text.strip()
        return {"answer": reply}
    except openai.OpenAIError as e:
        logger.error(f"OpenAI API Error: {str(e)}")
        # Handle OpenAI API errors
        raise HTTPException(status_code=500, detail=f"OpenAI API Error: {str(e)}")
    except Exception as e:
        logger.error(f"Internal Server Error: {str(e)}")
        # Handle other types of errors
        raise HTTPException(status_code=500, detail=f"Internal Server Error: {str(e)}")

# Run the application using Uvicorn server
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
