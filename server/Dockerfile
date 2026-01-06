# Use official Python 3.8 slim image as base
FROM python:3.8-slim

# Set environment variables to prevent Python buffering and enable unbuffered output
ENV PYTHONUNBUFFERED=1

# Set working directory inside the container
WORKDIR /app

# Copy requirements file and install dependencies
COPY requirements.txt /app/
RUN pip install --no-cache-dir -r requirements.txt

# Copy the entire backend project files into the container
COPY . /app/

# Expose port 8000 for Django development server
EXPOSE 8000

# Run Django development server on all interfaces
CMD ["python3", "manage.py", "runserver", "0.0.0.0:8000"]
