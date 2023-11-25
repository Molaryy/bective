import axios from 'axios';

class Todos {
  public async getTodos() {
    return await axios.get('http://localhost:8080/todos').then(res => res.data);
  }
}

export default Todos;
