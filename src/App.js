import { Component } from 'react';
import { CardList } from './components/card-list/card-list.component';
import { SearchBox } from './components/search-box/search-box.component';

import './App.css';

// App inherits from Component.React
class App extends Component {
  // constructor is the only place this.state should be directly assigned
  // use this.setState() in all other methods to update state
  constructor() {
    // calls Component's constructor
    super();

    // 'this' refers to 'App'
    this.state = {
      monsters: [],
      searchField: '',
      title: '',
    };
  }

  // executes as soon as the component is placed within the DOM
  // good place to initially fetch data
  componentDidMount() {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((response) => response.json())
      .then((users) => this.setState({ monsters: users }));
  }

  // JS automatically binds 'this' to the context this arrow function was defined initially
  // cannot call bind() on arrow functions
  // the context of this arrow function is the 'App' Component
  // this is called lexical scoping"
  handleChange = (event) => {
    this.setState({ searchField: event.target.value });
  };

  // only required method in a class Component
  // should not modify component state
  // returns the same result each time it's invoked
  // does not directly interact with the browser
  render() {
    const { monsters, searchField } = this.state; // same as 'const monsters = this.state.monsters;' etc

    const filteredMonsters = monsters.filter((monster) =>
      monster.name.toLowerCase().includes(searchField.toLowerCase())
    );

    return (
      <div className='App'>
        <h1> Monsters Rolodex </h1>
        <SearchBox
          placeholder='search monsters'
          handleChange={this.handleChange}
        />
        <CardList monsters={filteredMonsters} />
      </div>
    );
  }
}

export default App;
