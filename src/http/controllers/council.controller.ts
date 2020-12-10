import CouncilMember from '../../db/entity/CouncilMember'
import { Fasteer as F } from '@fasteerjs/fasteer'
import { successRes } from '../helpers/response.helper'

export const routePrefix = '/council'

export const CouncilController: F.FCtrl = async (fastify) => {
  fastify.get('/', async (req, res) => {
    const members = await CouncilMember.find()
    successRes({ members }) // TODO: make DTO class
  })
}

export default CouncilController

// async function createMemberObject(member: ICouncilMember) {
//   const avatar = await discordRepo.getAvatarUrlById(member.discordId)
//   return {
//     councilId: member._id,
//     name: member.name,
//     position: member.position,
//     about: member.about,
//     discord: {
//       id: member.discordId,
//       avatar: avatar,
//     },
//   }
// }
