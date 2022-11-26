let worlds: any = {
  Earth: {
    name: 'Earth',
  },
}

const worldsService = {
  getWorlds(name: any) {
    return worlds[name] ? [worlds[name]] : []
  },
}

export default worldsService
