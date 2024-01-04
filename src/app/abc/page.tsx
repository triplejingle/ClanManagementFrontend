

import { myAction } from './actions'

export default async function ClientComponent() {
    const result = await myAction();
    return (
        <form>
            {result}
            <button type="submit">Add to Cart</button>
        </form>
    )
}