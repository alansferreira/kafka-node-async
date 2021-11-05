import {
  Chunk,
  Consumer,
  ConsumerGroup,
  ConsumerGroupStream,
  CreateTopicRequest,
  CreateTopicResponse,
  KafkaClient,
  Message,
  MetadataResponse,
  Offset,
  OffsetCommitRequest,
  OffsetFetchRequest,
  OffsetRequest,
  Producer,
  ProduceRequest,
  ProducerStream,
  Topic
} from 'kafka-node'
import { promisify } from 'util'

export class KafkaClientAsync extends KafkaClient {
  public readonly closeAsync: () => Promise<void> = promisify(this.close).bind(
    this
  )

  public readonly topicExistsAsync: (topics: string[]) => Promise<boolean> =
    promisify(this.topicExists).bind(this) // if true not contains error

  public readonly refreshMetadataAsync: (topics: string[]) => Promise<void> =
    promisify(this.refreshMetadata).bind(this)

  public readonly sendOffsetCommitV2RequestAsync: (
    group: string,
    generationId: number,
    memberId: string,
    commits: OffsetCommitRequest[]
  ) => Promise<void> = promisify(this.sendOffsetCommitV2Request).bind(this)

  public readonly createTopicsAsync: (
    topics: CreateTopicRequest[]
  ) => Promise<CreateTopicResponse[]> = promisify(this.createTopics).bind(this)

  public readonly loadMetadataForTopicsAsync: (
    topics: string[]
  ) => Promise<MetadataResponse> = promisify(this.loadMetadataForTopics).bind(
    this
  )
}
export class ProducerAsync extends Producer {
  waitForReady() {
    return new Promise<void>(
      ((resolve, reject) => {
        this.once('ready', resolve)
        this.once('error', reject)
      }).bind(this)
    )
  }

  public readonly sendAsync: (payloads: ProduceRequest[]) => Promise<unknown> =
    promisify(this.send).bind(this)

  public readonly createTopicsAsync: (
    topics: string[],
    async?: boolean
  ) => Promise<any> = promisify(this.createTopics).bind(this)

  public readonly closeAsync: () => Promise<void> = promisify(this.close).bind(
    this
  )
}

export class ConsumerAsync extends Consumer {
  //   addTopics<T extends string[] | Topic[]>( topics: T, cb: (error: any, added: T) => any, fromOffset?: boolean): void

  public readonly removeTopicsAsync: (
    topics: string | string[]
  ) => Promise<number> = promisify(this.removeTopics).bind(this)

  public readonly commitAsync: (force?: boolean) => Promise<any> = promisify(
    this.commit
  ).bind(this)

  public readonly closeAsync: (force?: boolean) => Promise<void> = promisify(
    this.close
  ).bind(this)
}

export class ConsumerGroupStreamAsync extends ConsumerGroupStream {
  public readonly commitAsync: (
    message: Message,
    force?: boolean
  ) => Promise<any> = promisify(this.commit).bind(this)

  public readonly closeAsync: () => Promise<void> = promisify(this.close).bind(
    this
  )
}

export class ConsumerGroupAsync extends ConsumerGroup {
  public readonly closeAscync: (force?: boolean) => Promise<void> = promisify(
    this.close
  ).bind(this)

  public readonly addTopicsAscync: (
    topics: string[] | Topic[]
  ) => Promise<string[] | Topic[]> = promisify(this.addTopics).bind(this)

  public readonly removeTopicsAscync: (
    topics: string | string[]
  ) => Promise<number> = promisify(this.removeTopics).bind(this)

  public readonly commitAscync: (force?: boolean) => Promise<any> = promisify(
    this.commit
  ).bind(this)

  public readonly sendOffsetCommitRequestAscync: (
    commits: OffsetCommitRequest[]
  ) => Promise<any> = promisify(this.sendOffsetCommitRequest).bind(this)
}

export class OffsetAsync extends Offset {
  public readonly fetchAsync: (payloads: OffsetRequest[]) => Promise<any> =
    promisify(this.fetch).bind(this)

  public readonly commitAsync: (
    groupId: string,
    payloads: OffsetCommitRequest[]
  ) => Promise<any> = promisify(this.commit).bind(this)

  public readonly fetchCommitsAsync: (
    groupId: string,
    payloads: OffsetFetchRequest[]
  ) => Promise<any> = promisify(this.fetchCommits).bind(this)

  public readonly fetchLatestOffsetsAsync: (topics: string[]) => Promise<any> =
    promisify(this.fetchLatestOffsets).bind(this)

  public readonly fetchEarliestOffsetsAsync: (
    topics: string[]
  ) => Promise<any> = promisify(this.fetchEarliestOffsets).bind(this)
}

export class ProducerStreamAsync extends ProducerStream {
  public readonly sendPayloadAsync: (
    payloads: ProduceRequest[]
  ) => Promise<any> = promisify(this.sendPayload).bind(this)

  public readonly closeAsync: () => Promise<void> = promisify(this.close).bind(
    this
  )

  public readonly _writeAsync: (
    message: ProduceRequest,
    encoding: 'buffer' | 'utf8'
  ) => Promise<any> = promisify(this._write).bind(this)

  public readonly _writevAsync: (chunks: Chunk[]) => Promise<any> = promisify(
    this._writev
  ).bind(this)
}
