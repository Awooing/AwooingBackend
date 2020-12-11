import { Applicant } from '../entity/Applicant'

export class ApplicantDto {
  constructor(applicant: Applicant) {
    this.name = applicant.name
    this.content = applicant.content
  }

  static fromApplicant(applicant: Applicant) {
    return new this(applicant)
  }

  name: string

  content: string
}
