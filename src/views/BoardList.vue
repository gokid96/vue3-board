<template>
  <div class="board-list ">
    <!-- <h2>게시판</h2> -->
    <div class="board-header">
      <button @click="goToWrite" class="write-btn">글쓰기</button>
    </div>
    <table class="board-table">
      <thead>
        <tr>
          <th>번호</th>
          <th>제목</th>
          <th>작성자</th>
          <th>작성일</th>
          <th>조회수</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in posts" :key="post.id" @click="goToDetail(post.id)">
          <td>{{ post.id }}</td>
          <td>{{ post.title }}</td>
          <td>{{ post.author }}</td>
          <td>{{ formatDate(post.createdAt) }}</td>
          <td>{{ post.viewCount }}</td>
        </tr>
      </tbody>
    </table>
    <div class="pagination">
      <button v-for="page in totalPages" :key="page" @click="changePage(page)"
        :class="{ active: currentPage === page }">
        {{ page }}
      </button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'BoardList',
  data() {
    return {
      posts: [],
      currentPage: 1,
      totalPages: 1,
      pageSize: 10
    }
  },
  methods: {
    async fetchPosts() {
      try {
        const response = await axios.get(`http://localhost:8081/api/posts`, {
          params: {
            page: this.currentPage - 1,
            size: this.pageSize
          }
        });
        this.posts = response.data.content;
        this.totalPages = response.data.totalPages;
      } catch (error) {
        console.error('게시글 목록을 불러오는데 실패했습니다:', error);
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
    goToDetail(id) {
      this.$router.push(`/board/${id}`);
    },
    goToWrite() {
      this.$router.push('/board/write');
    },
    changePage(page) {
      this.currentPage = page;
      this.fetchPosts();
    }
  },
  created() {
    this.fetchPosts();
  }
}
</script>

<style scoped>
.board-list {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.board-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 20px;
}

.write-btn {
  padding: 8px 16px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.board-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

.board-table th,
.board-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.board-table th {
  background-color: #f5f5f5;
}

.board-table tbody tr:hover {
  background-color: #f9f9f9;
  cursor: pointer;
}

.pagination {
  display: flex;
  justify-content: center;
  gap: 10px;
}

.pagination button {
  padding: 8px 12px;
  border: 1px solid #ddd;
  background-color: white;
  cursor: pointer;
}

.pagination button.active {
  background-color: #4CAF50;
  color: white;
  border-color: #4CAF50;
}
</style>
