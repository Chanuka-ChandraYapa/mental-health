import openai
import os
import uvicorn
from dotenv import load_dotenv
from langchain.chains import RetrievalQA
from langchain_community.chat_models import ChatOpenAI
from langchain_community.document_loaders import CSVLoader
from langchain_openai import OpenAIEmbeddings
from langchain.prompts import PromptTemplate
from langchain_community.vectorstores import DocArrayInMemorySearch

# Load environment variables from .env file
load_dotenv()

# Set your OpenAI API key here
OPENAI_API_KEY = os.getenv("OPENAI_API_KEY")
# Set your OpenAI API key here
# OPENAI_API_KEY = "sk-proj-mEgbHIomXCRPqv7TWXiAT3BlbkFJGJTDsFvGktIQfMQ2GQUY"


def setup_chain():
    # Define file path and template
    file = os.path.join(os.path.dirname(__file__), 'Mental_Health_FAQ.csv')
    template = """
        # Template contents here
        """

    # Initialize embeddings, loader, and prompt
    embeddings = OpenAIEmbeddings()
    loader = CSVLoader(file_path=file, encoding='utf-8')
    docs = loader.load()
    prompt = PromptTemplate(template=template, input_variables=[
                            "context", "question"])

    # Create DocArrayInMemorySearch and retriever
    db = DocArrayInMemorySearch.from_documents(docs, embeddings)
    retriever = db.as_retriever()
    chain_type_kwargs = {"prompt": prompt}

    # Initialize ChatOpenAI
    llm = ChatOpenAI(
        openai_api_key=OPENAI_API_KEY,
        temperature=0
    )

    # Setup RetrievalQA chain
    chain = RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=retriever,
        chain_type_kwargs=chain_type_kwargs,
        verbose=True
    )
    return chain


agent = setup_chain()


def read_root(request: Request):
    return {"message": "Welcome to the Mental Health Chatbot API!"}


def process_prompt(prompt: str = Form(...)):
    response = agent.run(prompt)
    return {"response": response}
