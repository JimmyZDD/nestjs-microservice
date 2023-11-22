/*
 * @Author: zdd
 * @Date: 2023-11-21 10:27:22
 * @LastEditors: zdd dongdong@grizzlychina.com
 * @LastEditTime: 2023-11-22 11:21:12
 * @FilePath: item.controller.ts
 */
import { Controller } from '@nestjs/common';
import { Pagination } from './gen-code/common';
import {
  Item,
  Items,
  ItemServiceController,
  ItemServiceControllerMethods
} from './gen-code/item';
import { ItemById } from './gen-code/item';

const items = [
  {
    id: 1,
    name: 'Banana Peel',
    url: 'https://www.wpt-nl.com/images/module_image/img1_800_600_1593777835.jpg'
  },
  {
    id: 2,
    name: 'Waste Paper',
    url: 'https://www.wpt-nl.com/images/module_image/img1_800_600_1593777835.jpg'
  }
];

@Controller('item')
@ItemServiceControllerMethods()
export class ItemController implements ItemServiceController {
  getItems(request: Pagination): Items {
    return { list: items };
  }

  findOne(data: ItemById): Item {
    return items.find(({ id }) => id === data.id);
  }
}
