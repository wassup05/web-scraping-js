import { Builder, Browser, By } from "selenium-webdriver"

async function connect() {
  const map = {}
  const driver = await new Builder().forBrowser(Browser.FIREFOX).build()
  await driver.get("https://www.nvidia.com/en-in/geforce/buy/")

  const keys = await driver.findElements(By.css("div[id^='nv-title-'] h3.title"))

  for (const key of keys) {
    const productNameText = await key.getText()
    let shortText = productNameText.toLowerCase().substring(8).replaceAll(" ", "-")

    if (productNameText.includes("Ti")) {
      shortText = shortText.replace("-ti", "ti");
      if (productNameText.includes("4060")) {
        shortText += "-8gb"
      }
    }

    //console.log(shortText)

    const NA = await driver.findElements(
      By.css(`div[id^='${shortText}-start']`)
    )

    if (NA.length == 0) {
      map[productNameText] = "NA"
      continue
    }

    const priceText = await NA[0].getText()

    map[productNameText] = Number(priceText.slice(16).replaceAll(",",""))
  }


  await driver.quit()

  return map
}

export default connect
