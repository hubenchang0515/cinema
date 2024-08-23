'use client'

export const CONFIG = {
    HOST: typeof window !== "undefined" ? `${window.location.origin}/api/1` : 'http://localhost:/api/1',
    TYPE_FILTER: ['电影', '连续剧', '综艺', '动漫', '资讯', '公告', '头条', '伦理片'],
}