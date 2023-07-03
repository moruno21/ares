import { Before, DataTable, Then } from '@cucumber/cucumber'
import expect from 'expect'

export type Context = {
  errors: {
    code: number | string
    name: string
  }[]
}

Before(function (this: Context) {
  this.errors = []
})

Then(
  /^I should see the following errors?:$/,
  function (this: Context, dataTable: DataTable) {
    const table = dataTable.hashes()

    expect(this.errors).toStrictEqual(table)
  },
)
