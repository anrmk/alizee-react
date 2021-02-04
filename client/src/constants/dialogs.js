import React from "react";

import { Payment, Receipt, Purchase, CreatePost, CreateStories, CreateMood } from "../components/Post";
import SendTip from "../components/Tip";
import SocialList from "../domain/SocialList";
import { FollowingDialog } from "../domain/Chat";
import EditCoverDialog from "../domain/EditCoverDialog";
import DeleteAccountDialog from "../domain/DeleteAccountDialog";
import ResetPasswordDialog from "../domain/ResetPasswordDialog";

export const CREATE_POST_DIALOG_TYPE = "createPost";
export const CREATE_STORY_DIALOG_TYPE = "createStory";
export const CREATE_MOOD_DIALOG_TYPE = "createMood";

export const PAYMENT_DIALOG_TYPE = "payment";
export const SHARE_DIALOG_TYPE = "share";
export const RECEIPT_DIALOG_TYPE = "receipt";
export const PURCHASES_DIALOG_TYPE = "purchases";
export const SEND_TIP_DIALOG_TYPE = "sentTip";

export const CHAT_FOLLOWERS_TYPE = "chatFollowers";
export const PROFILE_EDIT_COVER = "profileEditCover";
export const DELETE_ACCOUNT_DIALOG_TYPE = "deleteAccount";
export const RESET_PWD_ACCOUNT_DIALOG_TYPE = "resetPasswordAccount";

const baseDialogProps = {
  dialogProps: { fullWidth: true },
  onCloseClick: () => {}
}

export default {
  [PAYMENT_DIALOG_TYPE]: (dialogProps, contentProps) => ({
    title: "Payment",
    content: <Payment {...contentProps} />,
    mainBtnText: "Buy",
    ...baseDialogProps,
    ...dialogProps
  }),
  [SHARE_DIALOG_TYPE]: (dialogProps, contentProps) => ({
    title: "Share post",
    content: <SocialList {...contentProps} />,
    ...baseDialogProps,
    ...dialogProps
  }),
  [RECEIPT_DIALOG_TYPE]: (dialogProps, contentProps) => ({
    title: "Receipt",
    content: <Receipt {...contentProps} />,
    ...baseDialogProps,
    ...dialogProps
  }),
  [PURCHASES_DIALOG_TYPE]: (dialogProps, contentProps) => ({
    title: "Purchases",
    content: <Purchase {...contentProps} />,
    ...baseDialogProps,
    ...dialogProps
  }),
  [CREATE_POST_DIALOG_TYPE]: (dialogProps, contentProps) => ({
    title: "Create Post",
    content: <CreatePost {...contentProps} />,
    mainBtnText: "Create",
    ...baseDialogProps,
    ...dialogProps
  }),
  [CREATE_STORY_DIALOG_TYPE]: (dialogProps, contentProps) => ({
    title: "Create Story",
    content: <CreateStories {...contentProps} />,
    mainBtnText: "Create",
    ...baseDialogProps,
    ...dialogProps
  }),
  [CREATE_MOOD_DIALOG_TYPE]: (dialogProps, contentProps) => ({
    title: "Create Mood",
    content: <CreateMood {...contentProps} />,
    mainBtnText: "Create",
    ...baseDialogProps,
    ...dialogProps
  }),
  [SEND_TIP_DIALOG_TYPE]: (dialogProps, contentProps) => ({
    title: "Send Tip",
    content: <SendTip {...contentProps} />,
    ...baseDialogProps,
    ...dialogProps
  }),
  [CHAT_FOLLOWERS_TYPE]: (dialogProps, contentProps) => ({
    title: "Chat Followers",
    content: <FollowingDialog {...contentProps} />,
    onCloseClick: () => {},
    ...dialogProps
  }),
  [PROFILE_EDIT_COVER]: (dialogProps, contentProps) => ({
    title: "Edit Cover",
    content: <EditCoverDialog {...contentProps} />,
    ...baseDialogProps,
    ...dialogProps
  }),
  [DELETE_ACCOUNT_DIALOG_TYPE]: (dialogProps, contentProps) => ({
    title: "Delete Account",
    content: <DeleteAccountDialog {...contentProps} />,
    mainBtnText: "Confirm",
    closeBtnText: "Disagree",
    ...baseDialogProps,
    ...dialogProps
  }),
  [RESET_PWD_ACCOUNT_DIALOG_TYPE]: (dialogProps, contentProps) => ({
    title: "Reset Your Password",
    content: <ResetPasswordDialog {...contentProps} />,
    mainBtnText: "Confirm",
    closeBtnText: "Disagree",
    ...baseDialogProps,
    ...dialogProps
  }),

  
};
