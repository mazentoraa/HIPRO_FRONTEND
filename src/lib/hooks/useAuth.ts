// Re-export from the canonical feature-level auth hook.
// LayoutWrapper provides AuthProvider from @/features/auth/context/AuthContext,
// so all consumers must read from that same context instance.
export { useAuth } from '@/features/auth/hooks/useAuth';