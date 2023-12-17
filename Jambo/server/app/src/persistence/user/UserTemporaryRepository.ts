import { Model, Document, Schema, model } from 'mongoose'
import { CacheManagerClient } from '../../communication/infrastructure/cache/CacheManagerClient'
import { CacheManagerFactory } from '../../communication/infrastructure/cache/CacheManagerFactory'

export class UserTemporaryRepository
{
  private cacheManager: CacheManagerClient | undefined

  constructor ()
  {
    this.cacheManager = CacheManagerFactory.getInstance()
  }

  async getAll(): Promise<Task[]>
  {
    const cachedTasks = await this.redisClient.get( 'tasks' )
    if ( cachedTasks )
    {
      return JSON.parse( cachedTasks )
    }

    const tasks = await TaskModel.find()
    await this.redisClient.set( 'tasks', JSON.stringify( tasks ) )
    return tasks
  }

  async getById( id: string ): Promise<Task | null>
  {
    const cachedTask = await this.redisClient.get( `task:${ id }` )
    if ( cachedTask )
    {
      return JSON.parse( cachedTask )
    }

    const task = await TaskModel.findById( id )
    if ( task )
    {
      await this.redisClient.set( `task:${ id }`, JSON.stringify( task ) )
    }

    return task
  }

  async create( task: Task ): Promise<Task>
  {
    const newTask = await TaskModel.create( task )
    await this.clearCache()
    return newTask
  }

  async update( id: string, task: Task ): Promise<Task | null>
  {
    const updatedTask = await TaskModel.findByIdAndUpdate( id, task, { new: true } )
    if ( updatedTask )
    {
      await this.clearCache()
    }
    return updatedTask
  }

  async delete( id: string ): Promise<void>
  {
    await TaskModel.findByIdAndDelete( id )
    await this.clearCache()
  }

  private async clearCache(): Promise<void>
  {
    await this.redisClient.del( 'tasks' )
  }
}
