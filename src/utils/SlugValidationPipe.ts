// // SlugValidationPipe.ts
// import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
// import { ArticleService } from './article.service';
//
// @Injectable()
// export class SlugValidationPipe implements PipeTransform {
//   constructor(private articleService: ArticleService) { }
//
//   async transform(value: any) {
//     const article = await this.articleService.getArticleBySlug(value);
//
//     if (!article) {
//       throw new BadRequestException('Article not found');
//     }
//
//     return article;
//   }
// }
