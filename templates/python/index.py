from io import StringIO
import pandas as pd

def gh(repo):
  return f"https://raw.githubusercontent.com/{repo}"

async def main():
  print("Running main script!")
  res = await window.request(
    gh("plutoniumm/ifactorial") + \
    "/main/src/routes/data/R1.csv"
  )

  df = pd.read_csv(StringIO(res))
  print(df.head())

asyncio.create_task(main())