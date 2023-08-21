import { Document, Model, PopulateOptions, Query, UpdateQuery } from 'mongoose'

// Reusable service methods for doing CRUD operations on DB models

type MongooseModel<T extends Document> = Model<T>

export const getAllDocuments = async <T extends Document>(
  model: MongooseModel<T>,
  populateOptions?: PopulateOptions[] | PopulateOptions,
): Promise<T[]> => {
  let query: Query<T[], T> = model.find()

  if (populateOptions) query = query.populate(populateOptions)

  const allDocuments = await query.exec()
  return allDocuments
}

export const getDocument = async <T extends Document>(
  id: string,
  model: MongooseModel<T>,
  populateOptions?: PopulateOptions[] | PopulateOptions,
) => {
  let query: Query<T[], T> = model.find({ id })

  if (populateOptions) query = query.populate(populateOptions)

  const document = await query
  return document
}

export const createDocument = async <T extends Document>(
  model: MongooseModel<T>,
  payload: T,
): Promise<T> => {
  const createdDocument = await model.create(payload)
  return createdDocument
}

export const updateDocument = async <T extends Document>(
  id: string,
  model: MongooseModel<T>,
  payload: UpdateQuery<T>,
): Promise<T | null> => {
  const updatedDocument = await model.findOneAndUpdate({ _id: id }, payload, {
    new: true,
    runValidators: true,
  })
  return updatedDocument
}

export const deleteDocument = async <T extends Document>(
  id: string,
  model: MongooseModel<T>,
): Promise<T | null> => {
  const deletedDocument = await model.findByIdAndDelete(id)
  return deletedDocument
}
