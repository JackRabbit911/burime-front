const titles: { [key: string]: string } = {
  home: 'Personal account',
  books: 'My Books',
  messages: 'My Messages',
  authors: 'My Authors',
}

export function getTitle (segment: string, branchId: string | undefined): string {
    return segment === 'branch' ?
        'Branch ' + (branchId ? 'editing' : 'creation') :
        titles[segment]
}
