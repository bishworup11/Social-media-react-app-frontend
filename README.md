# Project Documentation

## Project Overview

This project is a React.js frontend application for social media application , enabling users to create and manage posts, interact with others through comments and replies, and explore various features related to liking , who likes and like comments count.

## [**Backed Link🔗**](https://github.com/bishworup11/Learn_Adonis_js-)

## [**Previous Version Link🔗**](https://github.com/bishworup11/Social-media-react-app)

---

## Table of Contents

1. [Features](#features)
2. [Installation](#installation)
3. [Project Structure](#project-structure)
4. [Feature Details](#feature-details)
5. [Sample Data (Default Users)](#sample-data-default-users)
6. [Usage](#usage)
7. [Contributing](#contributing)
8. [License](#license)

---

## Features

- **User Registration and Authentication**: Users can register, log in, and log out of the application.
- **Post Creation and Management**: Users can create posts, edit or delete them, and choose between public and private modes.
- **Like/Unlike Functionality**: Users can like or unlike posts, comments, and replies, as well as view the list of people who liked each item.
- **Comment and Reply**: Users can comment on posts, reply to comments, and like/unlike both comments and replies.
- **Privacy Controls**: Each post can be set to public or private mode, allowing users to manage who can see their content.
- **Time-Stamping**: Posts, comments, and replies display the time elapsed since they were created, providing a sense of recency and engagement.
- **Data Persistence**: All data is stored in local storage, ensuring users’ information is retained even after refreshing the page.

## Installation

1. **Clone the repository:**

   ```bash
   git clone https://github.com/bishworup11/Social-media-react-app.git
   cd Social-media-react-app
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Start the development server:**

   ```bash
   npm start
   ```

4. **Build for production:**
   ```bash
   npm run build
   ```

## Project Structure

```plaintext
public/
├── assets/              # Contains images and other static assets
src/
├── components/          # Reusable React components
├── store/               # Redux slices and store configuration
│   ├── authSlice.js     # Handles authentication and user management
│   ├── postSlice.js     # Handles posts, comments, likes, and replies
│   └── store.js         # Redux store configuration
├── App.js               # Main App component
└── index.js             # App entry point
```

## Feature Details

### 1. **User Registration and Authentication**

- Users can register an account using an email and password.
- Login and logout functionalities allow users to access their personal accounts.
- Users can manage their own accounts and session data.

### 2. **Post Creation and Management**

- Users can create posts, which can contain text content.
- Posts can be set to either **public** or **private** mode:
  - **Public Mode**: Visible to all users.
  - **Private Mode**: Visible only to the user who created the post.
- Each post has a **timestamp** showing how long ago it was created.
- Users can **edit** or **delete** their own posts.

### 3. **Like and Unlike Functionality**

- Users can **like** or **unlike** posts, comments, and replies.
- When a user likes a post, their ID is added to the list of likes for that post.
- If a user unlikes a post, their ID is removed from the list of likes.
- Users can view the list of **who liked** each post, comment, or reply.
- Like counts are displayed, allowing users to see how popular an item is.

### 4. **Comment and Reply System**

- Users can **comment** on posts, fostering interactions and discussions.
- Users can also **reply** to comments, creating threaded conversations.
- Each comment and reply displays the **time** since it was posted.
- Users can like/unlike both comments and replies, with similar functionality as posts.
- **Reply likes** can be viewed by other users, providing insights into which replies are well-received.

### 5. **Privacy Controls**

- Each post has a **public/private toggle** that can be set by the user who created the post.
- **Public Posts** are accessible to all users, encouraging broader engagement.
- **Private Posts** are visible only to the post creator, ideal for personal or restricted content.

### 6. **Time-Stamping**

- Every post, comment, and reply includes a **time-stamp** that updates in real-time.
- This shows how recently each item was created, adding context for users.

### 7. **Data Persistence**

- All data (users, posts, likes, comments, and replies) is stored in **local storage**.
- This ensures that the user’s data persists between sessions, even if they refresh or close the browser.

## Usage

### Accessing Core Features

1. **Creating a Post**:
   - Navigate to the post creation area, type your content, and click “Post.”
   - Set the post to **Public** or **Private** mode before publishing.
2. **Interacting with Posts**:
   - Use the **Like** button to show appreciation for a post.
   - Click on the **Comment** button to add your thoughts or ask a question.
3. **Commenting and Replying**:
   - Leave a **comment** on a post and view others’ comments.
   - Reply to comments to engage in discussions with other users.
4. **Viewing Post Activity**:
   - Click on the like counter to see **who liked** a post, comment, or reply.
   - The time since each post, comment, or reply was made is displayed for easy reference.
5. **Managing Posts**:
   - Edit or delete your own posts by clicking the appropriate button.
   - Change the post’s visibility by toggling between **Public** and **Private** modes.

## Contributing

1. Fork the repository.
2. Create a new branch with your feature: `git checkout -b feature-branch`.
3. Commit your changes: `git commit -m 'Add a new feature'`.
4. Push to the branch: `git push origin feature-branch`.
5. Open a pull request on the main repository.

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
