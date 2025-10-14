Core Requirements:
1) Member Management

CRUD for members with First Name, Last Name, Birth Date, Country, City (all mandatory)

Unique constraint on (first_name, last_name, country, city) tuple

Age validation: must be ≥18 years old

2) Birthday Views

View all members

Sort by closest upcoming birthdays (with year rollover)

Filter birthdays in next 30 days

3) AI Personal Message Feature (the key feature)

Generate personalized birthday message

Optional tone parameter (friendly/formal)

Optional country-to-language localization

Explainability output: model name, key parameters, prompt/method, 2-sentence rationale (NO chain-of-thought)