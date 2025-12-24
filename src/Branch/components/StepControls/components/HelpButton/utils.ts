const prefix = 'create_branch/'
const paths = ['', 'genres', 'rules', 'authors', 'cover']

export const getHelpPath = (step: number) => prefix + paths[step]
