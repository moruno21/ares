import { IEvent } from '@nestjs/cqrs'

export type Metadata = {
  stream?: string
}

class Event<P = unknown> implements IEvent {
  private _metadata: Metadata

  get metadata(): Readonly<Metadata> {
    return this._metadata
  }

  get stream(): Readonly<Metadata['stream']> {
    return this._metadata.stream
  }

  withStream(stream: string): Event<P> {
    this._metadata = {
      ...this._metadata,
      stream: stream,
    }

    return this
  }
}

export default Event
