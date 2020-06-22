import CouncilMember, { ICouncilMember } from '../models/CouncilMember'
import discordRepo from '../models/repos/DiscordRepo'
import * as fp from 'fastify-plugin'

export default fp(async (server, opts, next) => {
  server.get('/council', async (request, reply) => {
    const response = await createMembersArray()
    reply.send({ members: response })
  })
})

async function createMembersArray(): Promise<Array<Object>> {
  const members = await CouncilMember.find()
  const response: Array<Object> = []
  for (let member of members) {
    const result = await createMemberObject(member)
    response.push(result)
  }
  return response
}

async function createMemberObject(member: ICouncilMember) {
  const avatar = await discordRepo.getAvatarUrlById(member.discordId)
  return {
    councilId: member._id,
    name: member.name,
    position: member.position,
    about: member.about,
    discord: {
      id: member.discordId,
      avatar: avatar,
    },
  }
}
