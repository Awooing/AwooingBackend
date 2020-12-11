import { Applicant } from '../../db/entity/Applicant'

export class ApplicantDto {
  constructor(entity: Applicant) {
    this.name = entity.name
    this.content = entity.content
  }

  static fromApplicant(entity: Applicant) {
    return new this(entity)
  }

  name: string

  content: string
}
