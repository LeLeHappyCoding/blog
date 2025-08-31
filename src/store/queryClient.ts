/**
 * @Description: queryClient
 * @Author: lele
 * @Date: 2025-08-30 20:47:58
 */
import {QueryClient} from '@tanstack/react-query';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
        },
    },
});

export default queryClient;
