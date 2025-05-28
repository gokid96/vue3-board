<template>
  <div class="board-detail">
    <div class="post-header">
      <h2>{{ post.title }}</h2>
      <div class="post-info">
        <span>작성자: {{ post.author }}</span>
        <span>작성일: {{ formatDate(post.createdAt) }}</span>
        <span>조회수: {{ post.viewCount }}</span>
      </div>
    </div>
    <div class="post-content">
      {{ post.content }}
    </div>
    <div class="post-actions">
      <button @click="goToList" class="btn">목록</button>
      <button @click="goToEdit" class="btn edit">수정</button>
      <button @click="deletePost" class="btn delete">삭제</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'BoardDetail',
  data() {
    return {
      post: {
        id: null,
        title: '',
        content: '',
        author: '',
        createdAt: '',
        viewCount: 0
      }
    }
  },
  methods: {
    async fetchPost() {
      try {
        const response = await axios.get(`http://localhost:8081/api/posts/${this.$route.params.id}`);
        this.post = response.data;
      } catch (error) {
        console.error('게시글을 불러오는데 실패했습니다:', error);
      }
    },
    formatDate(date) {
      return new Date(date).toLocaleDateString();
    },
    goToList() {
      this.$router.push('/board');
    },
    goToEdit() {
      this.$router.push(`/board/edit/${this.post.id}`);
    },
    async deletePost() {
      if (confirm('정말로 삭제하시겠습니까?')) {
        try {
          await axios.delete(`http://localhost:8081/api/posts/${this.post.id}`);
          this.goToList();
        } catch (error) {
          console.error('게시글 삭제에 실패했습니다:', error);
        }
      }
    }
  },
  created() {
    this.fetchPost();
  }
}
</script>

<style scoped>
.board-detail {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.post-header {
  border-bottom: 2px solid #ddd;
  padding-bottom: 20px;
  margin-bottom: 20px;
}

.post-header h2 {
  margin: 0 0 10px 0;
}

.post-info {
  display: flex;
  gap: 20px;
  color: #666;
  font-size: 0.9em;
}

.post-content {
  min-height: 200px;
  margin-bottom: 30px;
  line-height: 1.6;
}

.post-actions {
  display: flex;
  gap: 10px;
  justify-content: flex-end;
}

.btn {
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  background-color: #f5f5f5;
}

.btn.edit {
  background-color: #2196F3;
  color: white;
}

.btn.delete {
  background-color: #f44336;
  color: white;
}
</style>
