class Store {
    static clear() {
        localStorage.clear();
    }
    
    static remove(storageKey: string, filter: object) {
        const rawList = localStorage.getItem(storageKey);
    
        if (!rawList) return;
    
        const list: object[] = JSON.parse(rawList);
  
        localStorage.setItem(
          storageKey,
          JSON.stringify(list.filter((item) => !compareTwoObject(item, filter)))
        );
      }

    static create(keyStore: string, value: object) {
        const isStore = localStorage.getItem(keyStore)
        if (!isStore) {
            return localStorage.setItem(keyStore, JSON.stringify([value]))
        }

        const list = JSON.parse(isStore);

        list.push(value);

        localStorage.setItem(keyStore, JSON.stringify(list));
    }

    static findOne<T extends {}>(storageKey: string, filter = {}): T | undefined {
        const rawList = localStorage.getItem(storageKey);
    
        if (!rawList) return undefined;
    
        const parsedList: T[] = JSON.parse(rawList);
    
        if (isObjectEmpty(filter)) {
          return parsedList[0];
        }
    
        return parsedList.find((item) => compareTwoObject(item, filter));
      }

      static find<T>(storageKey: string, filter = {}): T[] | [] {
        const rawList = localStorage.getItem(storageKey);
    
        if (!rawList) return [];
    
        const parsedList: T[] = JSON.parse(rawList);
    
        if (isObjectEmpty(filter)) {
          return parsedList;
        }
    
        return parsedList.filter((item) => compareTwoObject(item, filter));
      }
    
      static update(storageKey: string, filter: object, value: object) {
        this.remove(storageKey, filter);
    
        const item = this.findOne(storageKey, filter);
        
        const updatedItem = { ...item, ...value };
    
        return this.create(storageKey, updatedItem);
      }
    
      static has(storageKey: string, filter: object) {
        const item = this.findOne(storageKey, filter);
    
        if (!item) return false;
    
        return !isObjectEmpty(item);
      }

}

const isObjectEmpty = (obj: object) => JSON.stringify(obj) === "{}";

const compareTwoObject = <T , K extends keyof T>(obj1 : T ,obj2 : T) => {
    let count = 0;

    const entriesObject = Object.entries(obj2) 

    for(const [key,value] of entriesObject){
        if(obj1[key as K] === value){
            count++
        }
    }
    return entriesObject.length === count
}

export default Store