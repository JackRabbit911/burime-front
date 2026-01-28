const titles: { [key: string]: string } = {
  home: 'Personal account',
  books: 'My Books',
  drafts: 'My Drafts',
  message: 'My Messages',
  authors: 'My Authors',
  author: 'My Author',
}

export function getTitle (segment: string, branchId: string | undefined): string {
    return segment === 'branch' ?
        'Branch ' + (branchId ? 'editing' : 'creation') :
        titles[segment]
}
