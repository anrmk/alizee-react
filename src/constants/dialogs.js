import React from "react";

import { Error } from "../components/ErrorDialog";
import { MediaEditorPreview, MediaPreview } from "../components/MediaEditor";
import UsersDialog from "../domain/UsersDialog";
import {
  Receipt,
  Purchase,
  CreatePost,
  CreateStories,
  CreateMood,
  Menu as PostMenu,
} from "../components/Post";
import { SendTip, Payment } from "../components/Payment";
import { ReportPost, BlockUser, UnblockUser } from "../components/Report";

import SocialList from "../domain/SocialList";
import { NewChatDialog, RoomMenuDialog } from "../domain/Chat";
import EditCoverDialog from "../domain/EditCoverDialog";
import StoryDialog from "../domain/StoryDialog";
import AgreeDialog from "../domain/AgreeDialog";
import ResetPasswordDialog from "../domain/ResetPasswordDialog";
import LanguageDialog from "../domain/LanguageDialog";
import ConfirmDialog from "../domain/ConfirmationDialog.js/ConfirmDialog";
import LightboxModal from "../domain/LightboxModal";
import PostStatistics from "../domain/PostStatistics/PostStatistics";
import SubscriptionBundleFormDialog from "../domain/SettingsForms/SubscriptionBundleFormDialog";

export const LANGUAGE_DIALOG_TYPE = "language";

export const CREATE_POST_DIALOG_TYPE = "createPost";
export const CREATE_STORY_DIALOG_TYPE = "createStory";
export const CREATE_MOOD_DIALOG_TYPE = "createMood";

export const POST_MENU_DIALOG_TYPE = "postmenu";
export const PAYMENT_DIALOG_TYPE = "payment";
export const FOLLOW_DIALOG_TYPE = "follow";
export const BLOCK_DIALOG_TYPE = "block";
export const UNBLOCK_DIALOG_TYPE = "unblock";
export const SHARE_POST_DIALOG_TYPE = "share";
export const REPORT_POST_DIALOG_TYPE = "reportPost";
export const RECEIPT_DIALOG_TYPE = "receipt";
export const PURCHASES_DIALOG_TYPE = "purchases";
export const SEND_TIP_DIALOG_TYPE = "sentTip";

export const CHAT_NEW_TYPE = "chatNew";
export const ROOM_MENU_DIALOG_TYPE = "roomMenu";

export const PROFILE_EDIT_COVER = "profileEditCover";
export const STORY_DIALOG_TYPE = "story";
export const FOLLOWERS_LIST_DIALOG_TYPE = "chatList";
export const USERS_LIST_DIALOG_TYPE = "usersList";

export const AGREE_DIALOG_TYPE = "agree";
export const RESET_PWD_ACCOUNT_DIALOG_TYPE = "resetPasswordAccount";

export const MEDIA_EDITOR_DIALOG_TYPE = "uploadFileEdit";
export const UPLOAD_FILE_AMOUNT_ERROR_DIALOG_TYPE = "uploadFileAmountError";

export const MEDIA_PREVIEW_DIALOG_TYPE = "mediaPreview";
export const CONFIRM_DIALOG_TYPE = "confirmation";

export const LIGHTBOX_MODAL_TYPE = "lightbox";

export const INDENTITY_DIALOG_TYPE = "identity";

export const POST_STATISTICS_DIALOG_TYPE = "postStatistics";

export const SUBSCRIPTION_BUNDLE_DIALOG_TYPE = "subscriptionBundle";

const baseDialogProps = {
  dialogProps: { fullWidth: true },
  onCloseClick: () => {},
};

export default {
  [LANGUAGE_DIALOG_TYPE]: (dialogProps, contentProps) => ({
    content: <LanguageDialog {...contentProps} />,
    ...baseDialogProps,
    ...dialogProps,
  }),

  [POST_MENU_DIALOG_TYPE]: (dialogProps, contentProps) => ({
    title: "Menu",
    content: <PostMenu {...contentProps} />,
    ...baseDialogProps,
    ...dialogProps,
  }),

  [REPORT_POST_DIALOG_TYPE]: (dialogProps, contentProps) => ({
    title: "Report",
    content: <ReportPost {...contentProps} />,
    mainBtnText: "Report",
    ...baseDialogProps,
    ...dialogProps,
  }),

  [BLOCK_DIALOG_TYPE]: (dialogProps, contentProps) => ({
    title: "Block",
    content: <BlockUser {...contentProps} />,
    mainBtnText: "Confirm",
    ...baseDialogProps,
    ...dialogProps,
  }),

  [UNBLOCK_DIALOG_TYPE]: (dialogProps, contentProps) => ({
    title: "Unblock",
    content: <UnblockUser {...contentProps} />,
    mainBtnText: "Confirm",
    ...baseDialogProps,
    ...dialogProps,
  }),

  [PAYMENT_DIALOG_TYPE]: (dialogProps, contentProps) => ({
    title: "Payment",
    content: <Payment {...contentProps} />,
    mainBtnText: "Pay",
    ...baseDialogProps,
    ...dialogProps,
  }),

  [FOLLOW_DIALOG_TYPE]: (dialogProps, contentProps) => ({
    title: "Subscribe",
    content: <Payment {...contentProps} />,
    mainBtnText: "Pay",
    ...baseDialogProps,
    ...dialogProps,
  }),
  [SHARE_POST_DIALOG_TYPE]: (dialogProps, contentProps) => ({
    title: "Share post",
    content: <SocialList {...contentProps} />,
    ...baseDialogProps,
    ...dialogProps,
  }),
  [RECEIPT_DIALOG_TYPE]: (dialogProps, contentProps) => ({
    title: "Receipt",
    content: <Receipt {...contentProps} />,
    ...baseDialogProps,
    ...dialogProps,
  }),
  [PURCHASES_DIALOG_TYPE]: (dialogProps, contentProps) => ({
    title: "Purchases",
    content: <Purchase {...contentProps} />,
    ...baseDialogProps,
    ...dialogProps,
  }),
  [CREATE_POST_DIALOG_TYPE]: (dialogProps, contentProps) => ({
    title: "Create Post",
    content: <CreatePost {...contentProps} />,
    mainBtnText: "Create",
    ...baseDialogProps,
    ...dialogProps,
  }),
  [CREATE_STORY_DIALOG_TYPE]: (dialogProps, contentProps) => ({
    title: "Create Story",
    content: <CreateStories {...contentProps} />,
    mainBtnText: "Create",
    ...baseDialogProps,
    ...dialogProps,
  }),
  [CREATE_MOOD_DIALOG_TYPE]: (dialogProps, contentProps) => ({
    title: "Create Mood",
    content: <CreateMood {...contentProps} />,
    mainBtnText: "Create",
    ...baseDialogProps,
    ...dialogProps,
  }),
  [SEND_TIP_DIALOG_TYPE]: (dialogProps, contentProps) => ({
    title: "Send Tip",
    content: <SendTip {...contentProps} />,
    ...baseDialogProps,
    ...dialogProps,
  }),
  [CHAT_NEW_TYPE]: (dialogProps, contentProps) => ({
    title: "Chat Followers",
    content: <NewChatDialog {...contentProps} />,
    onCloseClick: () => {},
    ...dialogProps,
  }),

  [ROOM_MENU_DIALOG_TYPE]: (dialogProps, contentProps) => ({
    title: "Menu",
    content: <RoomMenuDialog {...contentProps} />,
    onCloseClick: () => {},
    ...dialogProps,
  }),

  [PROFILE_EDIT_COVER]: (dialogProps, contentProps) => ({
    title: "Edit Cover",
    content: <EditCoverDialog {...contentProps} />,
    ...baseDialogProps,
    ...dialogProps,
  }),
  [STORY_DIALOG_TYPE]: (dialogProps, contentProps) => ({
    title: "Story",
    content: <StoryDialog {...contentProps} />,
    ...baseDialogProps,
    ...dialogProps,
  }),
  [USERS_LIST_DIALOG_TYPE]: (dialogProps, contentProps) => ({
    title: "Users List",
    content: <UsersDialog {...contentProps} />,
    mainBtnText: "Add",
    closeBtnText: "Cancel",
    ...baseDialogProps,
    ...dialogProps,
  }),
  [AGREE_DIALOG_TYPE]: (dialogProps, contentProps) => ({
    content: <AgreeDialog {...contentProps} />,
    mainBtnText: "Confirm",
    closeBtnText: "Disagree",
    ...baseDialogProps,
    ...dialogProps,
  }),
  [RESET_PWD_ACCOUNT_DIALOG_TYPE]: (dialogProps, contentProps) => ({
    title: "Reset Your Password",
    content: <ResetPasswordDialog {...contentProps} />,
    mainBtnText: "Confirm",
    closeBtnText: "Disagree",
    ...baseDialogProps,
    ...dialogProps,
  }),
  [UPLOAD_FILE_AMOUNT_ERROR_DIALOG_TYPE]: (dialogProps, contentProps) => ({
    title: "Error",
    content: <Error {...contentProps} />,
    ...baseDialogProps,
    ...dialogProps,
  }),
  [MEDIA_EDITOR_DIALOG_TYPE]: (dialogProps, contentProps) => ({
    title: "Media Preview",
    content: <MediaEditorPreview {...contentProps} />,
    mainBtnText: "Send",
    dialogProps: {
      disableBackdropClick: true,
      fullWidth: false,
    },
    ...dialogProps,
  }),
  [MEDIA_PREVIEW_DIALOG_TYPE]: (dialogProps, contentProps) => ({
    content: <MediaPreview {...contentProps} />,
    ...baseDialogProps,
    ...dialogProps,
  }),
  [CONFIRM_DIALOG_TYPE]: (dialogProps, contentProps) => ({
    content: <ConfirmDialog {...contentProps} />,
    mainBtnText: "Agree",
    ...baseDialogProps,
    ...dialogProps,
  }),
  [LIGHTBOX_MODAL_TYPE]: (dialogProps, contentProps) => ({
    content: <LightboxModal {...contentProps} />,
    ...baseDialogProps,
    ...dialogProps,
  }),
  [INDENTITY_DIALOG_TYPE]: (dialogProps, contentProps) => ({
    content: <LightboxModal {...contentProps} />,
    ...baseDialogProps,
    ...dialogProps,
  }),
  [POST_STATISTICS_DIALOG_TYPE]: (dialogProps, contentProps) => ({
    content: <PostStatistics {...contentProps} />,
    ...baseDialogProps,
    ...dialogProps,
  }),
  [SUBSCRIPTION_BUNDLE_DIALOG_TYPE]: (dialogProps, contentProps) => ({
    content: <SubscriptionBundleFormDialog {...contentProps} />,
    mainBtnText: "Save",
    ...baseDialogProps,
    ...dialogProps,
  }),
};
