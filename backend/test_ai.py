import openai
import os
import time
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

# Set your OpenAI API key
openai.api_key = os.getenv("OPENAI_API_KEY")

def get_priority_from_llm(title: str, description: str) -> str:
    prompt = f"""
You are a task management assistant. Based on the task title and description, classify its priority into exactly one of the following:

- High: Urgent and important tasks that MUST be done today or ASAP. (e.g., production outages, customer escalations, deadlines today)
- Medium: Important tasks that should be done in 2-3 days. (e.g., internal team tasks, reviewing reports)
- Low: Tasks that are not urgent and can wait a week or more. (e.g., backlog grooming, research, nice-to-have items)

Only respond with one of the three options: High, Medium, or Low.
Do not explain. Do not add anything else.

Examples:
---
Title: Fix server downtime  
Description: The production server is down and users are impacted.  
Priority: High

Title: Update team OKRs  
Description: Review and finalize OKRs for the quarter, due by Friday.  
Priority: Medium

Title: Explore new frontend framework  
Description: Research modern JS frameworks for possible use in future projects.  
Priority: Low

---

Now evaluate the following:

Title: {title}  
Description: {description}  
Priority:"""

    for attempt in range(1, 10):  # Retry up to 5 times
        try:
            print(f"Attempt {attempt}: Calling OpenAI API...")
            response = openai.ChatCompletion.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "user", "content": prompt}],
                max_tokens=5,
                temperature=0.2,
            )

            priority = response.choices[0].message['content'].strip()
            print("Response from OpenAI:", priority)

            if priority.lower() == "high":
                return "High"
            elif priority.lower() == "medium":
                return "Medium"
            elif priority.lower() == "low":
                return "Low"
            else:
                print("Unrecognized response:", priority)
                return "Medium"  # fallback

        except Exception as e:
            print(f"Error (attempt {attempt}):", e)
            time.sleep(1)  # brief delay before retry

    print("❌ Failed to get a valid response after 5 attempts.")
    return "Medium"

if __name__ == "__main__":
    priority = get_priority_from_llm(
        title="Fix payment gateway bug",
        description="The payment gateway is failing on checkout for multiple users."
    )
    print("Predicted Priority:", priority)
