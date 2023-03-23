// import { repositoryInjector } from './repository-injector';
// import { SentRecipientRepository } from './sent-recipient.repository';
// import { ToBeSentRecipientRepository } from './to-be-sent-recipient.repository';

import { UserRepository } from "./user.repository";

export const repositories = [
    UserRepository
];

export * from './user.repository';