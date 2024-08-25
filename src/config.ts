'use client'

const HOST = typeof window !== "undefined" ? `${window.location.origin}` : '';

export const CONFIG = {
    API: [`${HOST}/api/1/`, `${HOST}/api/2/`, `${HOST}/api/3/`, `${HOST}/api/4/`, `${HOST}/api/5/`],
    TIMEOUT: 5000,
    TYPE_FILTER: ['电影', '连续剧', '综艺', '动漫', '资讯', '公告', '头条', '伦理片'],
}