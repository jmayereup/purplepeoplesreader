/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Lessons = "lessons",
	Users = "users",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export enum LessonsTagsOptions {
	"A1" = "A1",
	"A2" = "A2",
	"B1" = "B1",
	"STORY" = "STORY",
	"CONVERSATION" = "CONVERSATION",
	"GRAMMAR" = "GRAMMAR",
	"NON-FICTION" = "NON-FICTION",
	"VIDEO" = "VIDEO",
}

export enum LessonsLanguageOptions {
	"English" = "English",
	"Thai" = "Thai",
	"German" = "German",
}
export type LessonsRecord = {
	content?: HTMLString
	contentLines?: string
	creatorId?: string
	imageUrl?: string
	audioUrl?: string
	videoUrl?: string
	language?: LessonsLanguageOptions
	shareable?: boolean
	tags?: LessonsTagsOptions[]
	title?: string
	vocabulary?: string
}
export type Playlist = [{id: string, title: string, language: LessonsLanguageOptions, points?: string}];

export type UsersRecord = {
	avatar?: string
	linesRead?: number
	playlist?: Playlist
	name?: string
}

// Response types include system fields and match responses from the PocketBase API
export type LessonsResponse<Texpand = unknown> = Required<LessonsRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	lessons: LessonsRecord
	users: UsersRecord
}

export type CollectionResponses = {
	lessons: LessonsResponse
	users: UsersResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'lessons'): RecordService<LessonsResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
}
