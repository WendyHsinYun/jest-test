export default class Model {
  constructor(value = []){
    this.$collection = [];

    if(value.length > 0){
      this.record(value);
    }
  }

  record(record) {
    this.$collection.push(...record);
    return this.$collection;
  }

  all(){
    return this.$collection;
  }

  find(id){ 
    const found = this.$collection.find(record => record.id === id)
    return found 
  }

  update(id, newName){
    const index = this.$collection.findIndex(record => record.id === id)
    this.$collection[index].name = newName
    return this.$collection[index]
  }
}