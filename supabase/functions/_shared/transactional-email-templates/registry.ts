/// <reference types="npm:@types/react@18.3.1" />
import * as React from 'npm:react@18.3.1'

export interface TemplateEntry {
  component: React.ComponentType<any>
  subject: string | ((data: Record<string, any>) => string)
  to?: string
  displayName?: string
  previewData?: Record<string, any>
}

import { template as leadConfirmation } from './lead-confirmation.tsx'
import { template as leadNotification } from './lead-notification.tsx'
import { template as sellerConfirmation } from './seller-confirmation.tsx'
import { template as investorInfoRequestConfirmation } from './investor-info-request-confirmation.tsx'
import { template as investorInfoRequestNotification } from './investor-info-request-notification.tsx'
import { template as studentNurtureDay2 } from './student-nurture-day2.tsx'
import { template as studentNurtureDay10 } from './student-nurture-day10.tsx'

export const TEMPLATES: Record<string, TemplateEntry> = {
  'lead-confirmation': leadConfirmation,
  'lead-notification': leadNotification,
  'seller-confirmation': sellerConfirmation,
  'investor-info-request-confirmation': investorInfoRequestConfirmation,
  'investor-info-request-notification': investorInfoRequestNotification,
  'student-nurture-day2': studentNurtureDay2,
  'student-nurture-day10': studentNurtureDay10,
}
