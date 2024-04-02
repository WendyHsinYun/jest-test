export default class Model {
  constructor(options = {}){ 
    const data = options.data || []; 
    delete options.data;
    this.$collection = [];
    this.$options = Object.assign({primaryKey: 'id'}, options); 
    if(data.length > 0) this.record(data);
  }

  record(data){ 
    const mappedRecord = data.map(entry => {
      if(entry[this.$options.primaryKey]){  
        return entry;
      }else{
        entry[this.$options.primaryKey] = Date.now() 
        return entry;
      }    
    })
    this.$collection.push(...mappedRecord);
  }

  all(){
    return this.$collection.map(entry => Object.assign({}, entry));
  }
  
  update(key, entry){
    const index = this.$collection.findIndex(entry => entry[this.$options.primaryKey] === key)
    
    if(index >= 0){
      this.$collection.splice(
        index, 
        1, 
        Object.assign(this.$collection[index], entry))
      }else{
        return false
      }
    }
    
  find(key){ 
    const entry = this.$collection.find(record => record[this.$options.primaryKey] === key) 
    return entry ? Object.assign({}, entry) : null
  }

  remove(key){
    const index = this.$collection.findIndex(entry => entry[this.$options.primaryKey] === key)

    if(index >= 0){
      this.$collection.splice(index, 1)
    }

  }
}