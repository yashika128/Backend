# 🚀 Node.js Backend Development Labs

<div align="center">

![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![Express.js](https://img.shields.io/badge/Express.js-404D59?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-00000F?style=for-the-badge&logo=mysql&logoColor=white)

**A comprehensive hands-on journey through Node.js backend development**

*From basic modules to full-stack database integration*

![GitHub stars](https://img.shields.io/github/stars/yourusername/node-backend-labs?style=social)
![GitHub forks](https://img.shields.io/github/forks/yourusername/node-backend-labs?style=social)

</div>

## 📖 Overview

This repository contains a **progressive series of Node.js backend development labs** designed to take you from beginner to intermediate level. Each lab builds upon the previous one, creating a solid foundation in server-side JavaScript development.

> 🎯 **Perfect for**: Students, bootcamp graduates, and developers transitioning to backend development

## 🗺️ Learning Path

**Lab 1** → **Lab 2** → **Lab 3** → **Lab 4**

📦 Modules & HTTP → 🌊 Streams → 🔄 REST APIs → 🗄️ Database Integration

---

## 🧪 Laboratory Modules

### 📦 **Lab 1** › Foundations: Modules, File System & HTTP

#### 🎯 Learning Objectives
- Master Node.js module system with `exports` and `require()`
- Build HTTP servers using the native `http` module  
- Handle asynchronous file operations with `fs`
- Understand request/response lifecycle

#### 🛠️ Hands-on Exercises

| Exercise | Description | Difficulty |
|----------|-------------|------------|
| **01** | Export objects and functions using `module.exports` | 🟢 Beginner |
| **02** | Create nested object exports with multiple functions | 🟢 Beginner |
| **03** | Build HTTP server with `createServer()` and handle requests | 🟡 Intermediate |
| **04** | Implement async file reading with proper error handling | 🟡 Intermediate |
| **05** | Create a file server that serves text files via HTTP | 🔴 Advanced |

#### 📚 Key Concepts
```javascript
// Module exports pattern
exports.greet = (name) => `Hello, ${name}!`;

// HTTP server creation
const server = http.createServer((req, res) => {
    // Handle requests
});
```

---

### 🌊 **Lab 2** › Data Flow: Working with Streams

#### 🎯 Learning Objectives
- Understand Node.js streams architecture
- Implement Readable and Writable streams
- Master stream piping for efficient data transfer
- Handle real-time user input with `process.stdin`

#### 🛠️ Hands-on Exercises

| Exercise | Description | Difficulty |
|----------|-------------|------------|
| **01** | Read file data using Readable streams | 🟢 Beginner |
| **02** | Write data to files using Writable streams | 🟢 Beginner |
| **03** | Implement stream piping between input/output files | 🟡 Intermediate |
| **04** | Create interactive CLI with `process.stdin` | 🟡 Intermediate |
| **05** | Build robust error handling for stream operations | 🔴 Advanced |

#### 🚀 Stream Power
```javascript
// Efficient file copying with streams
const readStream = fs.createReadStream('input.txt');
const writeStream = fs.createWriteStream('output.txt');
readStream.pipe(writeStream);
```

---

### 🔄 **Lab 3** › API Architecture: RESTful Services with Express

#### 🎯 Learning Objectives
- Master REST architectural principles
- Understand HTTP methods and status codes
- Build scalable APIs with Express.js
- Implement proper routing and middleware

#### 🚀 Capstone Project: To-Do List API

Build a complete RESTful API with the following endpoints:

| Method | Endpoint | Description | Response |
|--------|----------|-------------|----------|
| `GET` | `/api/todos` | Fetch all todo items | `200 OK` |
| `POST` | `/api/todos` | Create new todo item | `201 Created` |
| `PUT` | `/api/todos/:id` | Update existing item | `200 OK` |
| `DELETE` | `/api/todos/:id` | Delete todo item | `204 No Content` |

#### 📐 API Design Principles
- ✅ Resource-based URLs
- ✅ HTTP status codes  
- ✅ JSON request/response format
- ✅ Error handling middleware
- ✅ Input validation

---

### 🗄️ **Lab 4** › Data Persistence: Database Integration

#### 🎯 Learning Objectives
- Compare SQL vs NoSQL database paradigms
- Implement CRUD operations with databases
- Design repository pattern for data access
- Handle database connections and error states

#### 🎯 Enhanced To-Do API

Extend Lab 3's API with persistent data storage:

**Database Options:**
- 🍃 **MongoDB** (NoSQL) - Document-based storage
- 🐬 **MySQL/PostgreSQL** (SQL) - Relational database

#### 🏗️ Architecture Pattern
```
Routes (Express) → Controllers (Business Logic) → Repository (Database Layer)
```

#### 🔧 Implementation Features
- ✅ Database connection pooling
- ✅ Repository design pattern
- ✅ Data validation & sanitization
- ✅ Error handling & logging
- ✅ Environment configuration

---

## 🛠️ Technology Stack

| Category | Technologies |
|----------|-------------|
| **Runtime** | Node.js |
| **Framework** | Express.js |
| **Databases** | MongoDB, MySQL, PostgreSQL |
| **Tools** | npm, Postman |

---

## 🚀 Quick Start Guide

### Prerequisites
- **Node.js** (v14.x or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** for version control

### Installation & Setup

```bash
# Clone the repository
git clone https://github.com/yourusername/node-backend-labs.git
cd node-backend-labs

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env

# Start your learning journey!
cd lab-01-modules-http
node index.js
```

### 📁 Project Structure
```
node-backend-labs/
├── lab-01-modules-http/
│   ├── exercises/
│   ├── solutions/
│   └── README.md
├── lab-02-streams/
│   ├── exercises/
│   ├── solutions/
│   └── README.md
├── lab-03-rest-apis/
│   ├── src/
│   ├── tests/
│   └── README.md
├── lab-04-database-integration/
│   ├── mongodb-version/
│   ├── mysql-version/
│   └── README.md
├── package.json
└── README.md
```

---

## 📊 Learning Progress Tracker

Track your journey through the labs:

- [ ] **Lab 1**: Completed all 5 exercises
- [ ] **Lab 2**: Mastered streams and piping  
- [ ] **Lab 3**: Built complete REST API
- [ ] **Lab 4**: Integrated database successfully

## 🎯 Learning Outcomes

By completing these labs, you will be able to:

✅ **Build scalable Node.js applications** from scratch  
✅ **Design and implement RESTful APIs** following best practices  
✅ **Work with both SQL and NoSQL databases** efficiently  
✅ **Handle asynchronous operations** with confidence  
✅ **Implement proper error handling** and logging  
✅ **Apply software design patterns** in backend development  

---

## 🤝 Contributing

We welcome contributions! Here's how you can help:

1. **Fork** the repository
2. **Create** a feature branch (`git checkout -b feature/amazing-exercise`)
3. **Commit** your changes (`git commit -m 'Add amazing exercise'`)
4. **Push** to the branch (`git push origin feature/amazing-exercise`)
5. **Create** a Pull Request

### 💡 Ideas for Contributions
- Additional exercises or challenges
- Alternative database implementations
- Performance optimization examples
- Testing strategies and examples
- Documentation improvements

---

## 📚 Additional Resources

### 📖 Recommended Reading
- [Node.js Official Documentation](https://nodejs.org/docs/)
- [Express.js Guide](https://expressjs.com/guide/)
- [MongoDB University](https://university.mongodb.com/)
- [RESTful API Design Best Practices](https://restfulapi.net/)

### 🛠️ Useful Tools
- [Postman](https://www.postman.com/) - API testing
- [MongoDB Compass](https://www.mongodb.com/products/compass) - Database GUI
- [Robo 3T](https://robomongo.org/) - MongoDB management

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

<div align="center">

### 🌟 Ready to become a Node.js backend expert?

**Start with Lab 1** | **View Documentation** | **Join Discussions**

---

**Made with ❤️ for the Node.js community**

*If this helped you learn, please consider giving it a ⭐!*

</div>
