import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Res,
  Param,
  Query,
  Body,
  HttpStatus,
  NotFoundException
} from '@nestjs/common';
import { CreateProductDTO } from "./dto/product.dto";
import { actions, endPoint } from "../utils/constants";
import { nestDebugger } from "../utils/nestDebugger";
import { ProductService } from "./product.service";

@Controller('api/product')
export class ProductController {

  constructor(private productService: ProductService) {

  }

  @Post('/create')
  async createPost(@Res() res,
    @Body() createProductDTO: CreateProductDTO) {
      nestDebugger(actions.post, endPoint.product, createProductDTO);
      const product = await this.productService.createProduct(createProductDTO);
      return res.status(HttpStatus.OK).json({
        message: 'Product Successfully Created',
        product
      });
  }

  @Get('/')
  async getProducts(@Res() res) {
    const products = await this.productService.getProducts();
    return res.status(HttpStatus.OK).json({ products });
  }

  @Get('/:productID')
  async getProduct(@Res() res, @Param('productID') productID) {
    const product = await this.productService.getProduct(productID);
    if (!product) throw new NotFoundException('Product does not exist');
    return res.status(HttpStatus.OK).json(product);
  }

  @Delete('/delete')
  async deleteProduct(@Res() res, @Query('productID') productID) {
    const productDeleted = await this.productService.deleteProduct(productID);
    if (!productDeleted) throw new NotFoundException('Product does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Product deleted successfully',
      productDeleted
    })
  }

  @Put('/update')
  async updateProduct(@Res() res, @Body() createProductDTO: CreateProductDTO, @Query('productID') productID) {
    const updatedProduct = await this.productService.updateProduct(productID, createProductDTO);
    if(!updatedProduct) throw new NotFoundException('Product does not exist');
    return res.status(HttpStatus.OK).json({
      message: 'Product updated successfully',
      updatedProduct
    });
  }

}
