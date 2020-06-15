import { Router, Request, Response } from 'express'
import CouncilMember, { ICouncilMember } from '../models/CouncilMember'
import discordRepo from '../models/repos/DiscordRepo'
const router = Router()


router.get('/', async (req: Request, res: Response) => {
    const response = await createMembersArray()
    await res.send({members: await response})
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

async function createMemberObject(member: ICouncilMember): Promise<Object> {
    const avatar = await discordRepo.getAvatarUrlById(member.discordId)
    return {
        councilId: member._id,
        name: member.name,
        position: member.position,
        about: member.about,
        discord: {
            id: member.discordId,
            avatar: avatar
        }
    } 
}

export default router