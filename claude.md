# Philosophy
- Follow the KISS and DRY philosophies when approaching any problem, bug, or feature. Remember this is a project in production so we should always change only as little as necessary.
- Always follow coding best practices - no dead code, well logged code, clean code with modular functions, no code duplication.

# Workflow
- Always first read the README.md to understand the overall architecture first.
- ALways use the Makefile for builds and deployments.
- Always research, plan, bounce ideas back and forth with the user before starting to develop a major feature or fixing a major bug.
- Be sure to typecheck when you’re done making a series of code changes.
- Always create temporary scripts and tests in /tmp
- You are permitted to make any read only database queries as necessary but do not make any updates without explicit permissions.
- Store any TODOs or major tech debt or important plans in the TODO section below.

# Code style
- The project uses black, flake8, mypy, and codespell for python code. Understand and respect those configurations.
- Keep the code modular and name variables sensibly based on what they do.
- This is a monorepo that has the code for the AI agent (Python), webapp backend (Python FastAPI), and webapp frontend (React and Typescript)
- TypeScript: Use strict mode with no implicit any, prefer type inference over explicit typing, and leverage discriminated unions for state management
- React: Favor functional components with hooks, use React.memo sparingly for actual performance bottlenecks, and colocate component logic with custom hooks 

# Development environment
- The working directory is /Users/sandy/projects/silvertongue/
- Use the silvertongue-dev pyenv virtualenvwrapper environment.

# Configuration
- There is a .env in the project root that has common credentials - database and API
- Always understand the schema (shared/database/schema.sql) before generating SQL queries.
- Each subfolder - agent, webapp/backend and webapp/frontend has it's own .env
- The agent has a sophisticated configuration for scheduling, usage of APIs, concurrency, and LLM usage in config_modules

# Git workflow
- You can use gh cli to interact with the remote Github repository.
- Whenever you create a branch to experiment or test, use claude/feature-name as the branch name.
- pre-commit hooks are installed for Python. Make sure they are respected.

# Bash Commands
- View ECS task logs: `aws logs tail /ecs/silvertongue-agent --follow --region ap-south-1`
- Check EventBridge rule: `aws events describe-rule --name silvertongue-{rule-name} --region ap-south-1`
- List running ECS tasks: `aws ecs list-tasks --cluster craftai-silvertongue-production --region ap-south-1`
- Monitor batch progress: `python monitoring/monitor_batch.py --batch "10:00-13:00" --tenant 1`
- Check reconciliation logs: `aws logs tail /ecs/silvertongue-reconciliation --region ap-south-1 --since 1h`
- Database connection: `PGPASSWORD='xY&?#Xi#6A?Ccb8j' psql -h silvertongue-prd.cbi2m8c8yym4.ap-south-1.rds.amazonaws.com -p 5432 -U postgres silvertongue`
- Database query: `PGPASSWORD='xY&?#Xi#6A?Ccb8j' psql -h silvertongue-prd.cbi2m8c8yym4.ap-south-1.rds.amazonaws.com -p 5432 -U postgres silvertongue -c "SELECT ..."`

# TODOs