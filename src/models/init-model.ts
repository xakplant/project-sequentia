import { Product } from './product.model'
import { mockProduct } from './__mocks__'



export const initModels = async () => {
    try {
        await Product.sync();
        // TODO if only dev
        await Product.bulkCreate([mockProduct])
    } catch(e){
        console.log(e)
    }
}