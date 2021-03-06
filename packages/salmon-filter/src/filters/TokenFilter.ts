import { AbstractFilter } from '../AbstractFilter'
import { AssetPrice } from '@defichain/salmon-fetch'

/**
 * TokenFilter checks if any token is invalid, is an empty string, contains whitespaces
 * This filter rejects all assets if any token fit a condition.
 */
export class TokenFilter extends AbstractFilter {
  async call (prices: AssetPrice[]): Promise<AssetPrice[]> {
    for (const price of prices) {
      if (isInvalid(price)) {
        this.error(`TokenFilter.isInvalid ${JSON.stringify(price)}`)
      }
    }

    return prices
  }
}

/**
 * Assets with a token of this value cannot be traded and will be rejected.
 *
 * @return boolean
 */
function isInvalid (price: AssetPrice): boolean {
  if (price.token.includes(' ')) {
    return true
  }

  return price.token.trim().length === 0
}
