/*
 * @Description:
 * @Author: lele
 * @Date: 2025-08-31 15:58:02
 */
import React from 'react';

interface BaseInfoProps {}

const BaseInfo = (props: BaseInfoProps) => {
    return (
        <section className="w-[280px] px-[32px] py-[24px] bg-[var(--side-bg)]">
            <div className="flex justify-center items-center gap-[16px]">
                <img
                    className="size-[40px] rounded-[16px]"
                    src="/avatar.png"
                    alt="头像"
                />
                <span className="text-[18px] leading-[28px] text-[var(--text)]">
                    今天早起啦
                </span>
            </div>
        </section>
    );
};

export default BaseInfo;
