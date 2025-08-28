export class TradeDTO {
  static parser (d) {
    return {
      id: d.id,
      name: d.name,
      metaTitle: d.metaTitle,
      metaDescription: d.metaDescription,
      metaKeywords: d.metaKeywords,
      ogImage: d.ogImage,
      twitterCard: d.twitterCard,
      officialWebsite: d.officialWebsite,
      socialMedia: d.socialMedia,
      brandStory :d.brandStory,
      enabled: d.enabled
    }
  }
}
export const emptyObject = {
  id: 0,
      name:'no data yet',
      metaTitle:'no data yet',
      metaDescription: 'no data yet',
      metaKeywords: 'no data yet',
      ogImage: 'no data yet',
      twitterCard:'no data yet',
      officialWebsite: 'no data yet',
      socialMedia: 'no data yet',
      brandStory:'no data yet',
      enabled: 'no data yet',
}
  