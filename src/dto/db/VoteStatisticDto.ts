import { VoteStatistic } from '../entity/VoteStatistic'

export class VoteStatisticDto {
  constructor(entity: VoteStatistic) {
    this.applicant = entity.applicant
    this.votes = entity.votes
  }

  static fromVoteStatistic(entity: VoteStatistic) {
    return new this(entity)
  }

  applicant: string

  votes: number
}
