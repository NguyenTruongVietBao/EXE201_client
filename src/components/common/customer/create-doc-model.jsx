import {
  BookOpenIcon,
  Upload,
  Star,
  X,
  Tag,
  FileText,
  User,
  File,
  CheckCircle,
  Image,
  Archive,
} from 'lucide-react';
import React, { useState } from 'react';
import { INTERESTS } from '../../../constants';

export default function CreateDocModel() {
  const [documentData, setDocumentData] = useState({
    name: '',
    description: '',
    category: '',
    rating: 0,
    tags: [],
    level: '',
    duration: '',
    thumbnailFiles: [],
    documentFiles: [],
  });

  const [hoveredStar, setHoveredStar] = useState(0);
  const [showTagDropdown, setShowTagDropdown] = useState(false);
  const [dragActive, setDragActive] = useState(false);
  const [docDragActive, setDocDragActive] = useState(false);

  const levels = ['Beginner', 'Intermediate', 'Advanced'];
  const allowedDocTypes = {
    'application/pdf': '.pdf',
    'application/msword': '.doc',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      '.docx',
    'application/vnd.ms-powerpoint': '.ppt',
    'application/vnd.openxmlformats-officedocument.presentationml.presentation':
      '.pptx',
    'text/plain': '.txt',
    'application/rtf': '.rtf',
    'application/zip': '.zip',
    'application/x-zip-compressed': '.zip',
    'application/x-rar-compressed': '.rar',
    'application/x-7z-compressed': '.7z',
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Document Data:', documentData);
    // Add your submit logic here
    handleClose(e);
  };

  const handleClose = (e) => {
    e.preventDefault();
    document.getElementById('create_modal').close();
    setDocumentData({
      name: '',
      description: '',
      category: '',
      rating: 0,
      tags: [],
      level: '',
      duration: '',
      thumbnailFiles: [],
      documentFiles: [],
    });
    setHoveredStar(0);
    setShowTagDropdown(false);
  };

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'number') {
      setDocumentData({
        ...documentData,
        [name]: parseFloat(value) || 0,
      });
    } else {
      setDocumentData({
        ...documentData,
        [name]: value,
      });
    }
  };

  const handleThumbnailUpload = (files) => {
    const validFiles = [];
    const fileArray = Array.from(files);

    fileArray.forEach((file) => {
      if (file && file.type.startsWith('image/')) {
        if (file.size > 5 * 1024 * 1024) {
          alert(`Image ${file.name} is too large. Max size is 5MB`);
          return;
        }
        validFiles.push(file);
      }
    });

    if (validFiles.length > 0) {
      setDocumentData({
        ...documentData,
        thumbnailFiles: [...documentData.thumbnailFiles, ...validFiles],
      });
    }
  };

  const handleDocumentUpload = (files) => {
    const validFiles = [];
    const fileArray = Array.from(files);

    fileArray.forEach((file) => {
      if (
        file &&
        (allowedDocTypes[file.type] ||
          file.name.endsWith('.zip') ||
          file.name.endsWith('.rar') ||
          file.name.endsWith('.7z'))
      ) {
        // Check file size (max 100MB for documents)
        if (file.size > 100 * 1024 * 1024) {
          alert(`File ${file.name} is too large. Max size is 100MB`);
          return;
        }
        validFiles.push(file);
      } else {
        alert(`${file.name} is not a valid document file`);
      }
    });

    if (validFiles.length > 0) {
      setDocumentData({
        ...documentData,
        documentFiles: [...documentData.documentFiles, ...validFiles],
      });
    }
  };

  const handleThumbnailDrop = (e) => {
    e.preventDefault();
    setDragActive(false);
    const files = e.dataTransfer.files;
    handleThumbnailUpload(files);
  };

  const handleDocumentDrop = (e) => {
    e.preventDefault();
    setDocDragActive(false);
    const files = e.dataTransfer.files;
    handleDocumentUpload(files);
  };

  const handleThumbnailDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleThumbnailDragLeave = (e) => {
    e.preventDefault();
    setDragActive(false);
  };

  const handleDocumentDragOver = (e) => {
    e.preventDefault();
    setDocDragActive(true);
  };

  const handleDocumentDragLeave = (e) => {
    e.preventDefault();
    setDocDragActive(false);
  };

  const handleStarClick = (rating) => {
    setDocumentData({ ...documentData, rating });
  };

  const handleTagToggle = (tag) => {
    const isSelected = documentData.tags.includes(tag.name);
    if (isSelected) {
      setDocumentData({
        ...documentData,
        tags: documentData.tags.filter((t) => t !== tag.name),
      });
    } else {
      setDocumentData({
        ...documentData,
        tags: [...documentData.tags, tag.name],
      });
    }
  };

  const removeTag = (tagToRemove) => {
    setDocumentData({
      ...documentData,
      tags: documentData.tags.filter((tag) => tag !== tagToRemove),
    });
  };

  const removeThumbnail = (indexToRemove) => {
    setDocumentData({
      ...documentData,
      thumbnailFiles: documentData.thumbnailFiles.filter(
        (_, index) => index !== indexToRemove
      ),
    });
  };

  const removeDocument = (indexToRemove) => {
    setDocumentData({
      ...documentData,
      documentFiles: documentData.documentFiles.filter(
        (_, index) => index !== indexToRemove
      ),
    });
  };

  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getFileIcon = (fileType, fileName) => {
    if (fileType === 'application/pdf') return '📄';
    if (fileType.includes('word')) return '📝';
    if (fileType.includes('presentation')) return '📊';
    if (fileType === 'text/plain') return '📃';
    if (fileType.includes('zip') || fileName.endsWith('.zip')) return '📦';
    if (fileName.endsWith('.rar')) return '📦';
    if (fileName.endsWith('.7z')) return '📦';
    return '📋';
  };

  return (
    <>
      <button
        onClick={() => document.getElementById('create_modal').showModal()}
        className='px-6 py-3 rounded-xl font-semibold transition-all duration-300 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg hover:shadow-xl transform hover:scale-105 flex items-center gap-2 cursor-pointer'
      >
        <BookOpenIcon className='w-5 h-5' />
        Share Document
      </button>

      <dialog id='create_modal' className='modal backdrop-blur-sm'>
        <div className='modal-box max-w-6xl w-full max-h-[90vh] overflow-y-auto bg-white rounded-3xl shadow-2xl border-0'>
          {/* Header */}
          <div className='flex items-center justify-between mb-6 pb-4 border-b border-gray-200'>
            <div>
              <h3 className='text-2xl font-bold text-gray-900 flex items-center gap-2'>
                <BookOpenIcon className='w-6 h-6 text-blue-600' />
                Share Your Free Document
              </h3>
              <p className='text-gray-600 mt-1'>
                Help others learn by sharing your knowledge for free
              </p>
            </div>
            <button
              onClick={handleClose}
              className='p-2 hover:bg-gray-100 rounded-xl transition-colors duration-200'
            >
              <X className='w-5 h-5 text-gray-500' />
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
              {/* Left Column */}
              <div className='space-y-6'>
                {/* Document Name */}
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2'>
                    <FileText className='w-4 h-4' />
                    Document Title *
                  </label>
                  <input
                    type='text'
                    name='name'
                    value={documentData.name}
                    onChange={handleChange}
                    placeholder='Enter document title...'
                    className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                    required
                  />
                </div>

                {/* Description */}
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Description *
                  </label>
                  <textarea
                    name='description'
                    value={documentData.description}
                    onChange={handleChange}
                    placeholder='Describe your document...'
                    rows={4}
                    className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none'
                    required
                  />
                </div>

                {/* Category & Level */}
                <div className='grid grid-cols-2 gap-4'>
                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                      Category *
                    </label>
                    <input
                      type='text'
                      name='category'
                      value={documentData.category}
                      onChange={handleChange}
                      placeholder='e.g., Programming, Math, Science...'
                      className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                      required
                    />
                  </div>

                  <div>
                    <label className='block text-sm font-semibold text-gray-700 mb-2'>
                      Level *
                    </label>
                    <select
                      name='level'
                      value={documentData.level}
                      onChange={handleChange}
                      className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                      required
                    >
                      <option value=''>Select level</option>
                      {levels.map((level) => (
                        <option key={level} value={level}>
                          {level}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Duration
                  </label>
                  <input
                    type='text'
                    name='duration'
                    value={documentData.duration}
                    onChange={handleChange}
                    placeholder='e.g., 2 hours, 30 minutes...'
                    className='w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200'
                  />
                </div>

                {/* Rating */}
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2'>
                    Self Rating
                  </label>
                  <div className='flex items-center gap-2'>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type='button'
                        onClick={() => handleStarClick(star)}
                        onMouseEnter={() => setHoveredStar(star)}
                        onMouseLeave={() => setHoveredStar(0)}
                        className='p-1 transition-transform duration-200 hover:scale-110'
                      >
                        <Star
                          className={`w-6 h-6 transition-colors duration-200 ${
                            star <= (hoveredStar || documentData.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className='text-sm text-gray-600 ml-2'>
                      {documentData.rating > 0
                        ? `${documentData.rating}/5`
                        : 'Not rated'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Right Column */}
              <div className='space-y-6'>
                {/* Document Files Upload */}
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2'>
                    <File className='w-4 h-4' />
                    Document Files * ({documentData.documentFiles.length} files)
                  </label>

                  {/* Document File List */}
                  {documentData.documentFiles.length > 0 && (
                    <div className='mb-4 max-h-32 overflow-y-auto space-y-2'>
                      {documentData.documentFiles.map((file, index) => (
                        <div
                          key={index}
                          className='flex items-center gap-3 p-2 bg-emerald-50 rounded-lg border border-emerald-200'
                        >
                          <div className='text-lg'>
                            {getFileIcon(file.type, file.name)}
                          </div>
                          <div className='flex-1 min-w-0'>
                            <p className='font-medium text-gray-900 truncate text-sm'>
                              {file.name}
                            </p>
                            <p className='text-xs text-gray-500'>
                              {formatFileSize(file.size)}
                            </p>
                          </div>
                          <button
                            type='button'
                            onClick={() => removeDocument(index)}
                            className='p-1 hover:bg-red-100 rounded-full transition-colors duration-200'
                          >
                            <X className='w-3 h-3 text-red-500' />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  <div
                    className={`relative border-2 border-dashed rounded-xl transition-all duration-200 ${
                      docDragActive
                        ? 'border-emerald-500 bg-emerald-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onDrop={handleDocumentDrop}
                    onDragOver={handleDocumentDragOver}
                    onDragLeave={handleDocumentDragLeave}
                  >
                    <label className='flex flex-col items-center justify-center h-28 cursor-pointer p-4'>
                      <Archive className='w-8 h-8 text-gray-400 mb-2' />
                      <span className='text-sm text-gray-600 mb-1 text-center'>
                        Drop multiple documents here or click to upload
                      </span>
                      <span className='text-xs text-gray-400 text-center'>
                        PDF, DOC, DOCX, PPT, PPTX, TXT, RTF, ZIP, RAR, 7Z (Max
                        100MB each)
                      </span>
                      <input
                        type='file'
                        accept='.pdf,.doc,.docx,.ppt,.pptx,.txt,.rtf,.zip,.rar,.7z'
                        multiple
                        onChange={(e) => handleDocumentUpload(e.target.files)}
                        className='hidden'
                        required={documentData.documentFiles.length === 0}
                      />
                    </label>
                  </div>
                </div>

                {/* Image Upload */}
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2'>
                    <Image className='w-4 h-4' />
                    Thumbnail Images ({documentData.thumbnailFiles.length}{' '}
                    images)
                  </label>

                  {/* Image Preview Grid */}
                  {documentData.thumbnailFiles.length > 0 && (
                    <div className='mb-4 grid grid-cols-2 gap-2 max-h-40 overflow-y-auto'>
                      {documentData.thumbnailFiles.map((file, index) => (
                        <div key={index} className='relative group'>
                          <img
                            src={URL.createObjectURL(file)}
                            alt={`Preview ${index + 1}`}
                            className='w-full h-20 object-cover rounded-lg'
                          />
                          <button
                            type='button'
                            onClick={() => removeThumbnail(index)}
                            className='absolute top-1 right-1 p-1 bg-red-500 text-white rounded-full hover:bg-red-600 transition-colors duration-200 opacity-0 group-hover:opacity-100'
                          >
                            <X className='w-3 h-3' />
                          </button>
                          <div className='absolute bottom-1 left-1 px-1 py-0.5 bg-black/50 text-white text-xs rounded'>
                            {formatFileSize(file.size)}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  <div
                    className={`relative border-2 border-dashed rounded-xl transition-all duration-200 ${
                      dragActive
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-300 hover:border-gray-400'
                    }`}
                    onDrop={handleThumbnailDrop}
                    onDragOver={handleThumbnailDragOver}
                    onDragLeave={handleThumbnailDragLeave}
                  >
                    <label className='flex flex-col items-center justify-center h-32 cursor-pointer'>
                      <Upload className='w-8 h-8 text-gray-400 mb-2' />
                      <span className='text-sm text-gray-600 mb-1'>
                        Drop multiple images here or click to upload
                      </span>
                      <span className='text-xs text-gray-400'>
                        PNG, JPG, GIF, WEBP up to 5MB each
                      </span>
                      <input
                        type='file'
                        accept='image/*'
                        multiple
                        onChange={(e) => handleThumbnailUpload(e.target.files)}
                        className='hidden'
                      />
                    </label>
                  </div>
                </div>

                {/* Tags Selection */}
                <div>
                  <label className='block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2'>
                    <Tag className='w-4 h-4' />
                    Tags
                  </label>

                  {/* Selected Tags */}
                  {documentData.tags.length > 0 && (
                    <div className='flex flex-wrap gap-2 mb-3'>
                      {documentData.tags.map((tag) => (
                        <span
                          key={tag}
                          className='inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm'
                        >
                          {INTERESTS.find((i) => i.name === tag)?.emoji} {tag}
                          <button
                            type='button'
                            onClick={() => removeTag(tag)}
                            className='p-0.5 hover:bg-blue-200 rounded-full transition-colors duration-200'
                          >
                            <X className='w-3 h-3' />
                          </button>
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Tag Dropdown */}
                  <div className='relative'>
                    <button
                      type='button'
                      onClick={() => setShowTagDropdown(!showTagDropdown)}
                      className='w-full px-4 py-3 border border-gray-200 rounded-xl text-left focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 flex items-center justify-between'
                    >
                      <span className='text-gray-500'>
                        {documentData.tags.length > 0
                          ? `${documentData.tags.length} tags selected`
                          : 'Select tags...'}
                      </span>
                      <Tag className='w-4 h-4 text-gray-400' />
                    </button>

                    {showTagDropdown && (
                      <div className='absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-48 overflow-y-auto'>
                        {INTERESTS.map((interest) => (
                          <button
                            key={interest.id}
                            type='button'
                            onClick={() => handleTagToggle(interest)}
                            className={`w-full px-4 py-2 text-left hover:bg-gray-50 transition-colors duration-200 flex items-center gap-2 ${
                              documentData.tags.includes(interest.name)
                                ? 'bg-blue-50 text-blue-700'
                                : ''
                            }`}
                          >
                            <span>{interest.emoji}</span>
                            <span>{interest.name}</span>
                            {documentData.tags.includes(interest.name) && (
                              <span className='ml-auto text-blue-500'>✓</span>
                            )}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Free Document Badge */}
                <div className='bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-4'>
                  <div className='flex items-center gap-5'>
                    <div className='w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full flex items-center justify-center'>
                      <span className='text-white font-bold text-sm p-1'>
                        FREE
                      </span>
                    </div>
                    <div>
                      <h4 className='font-semibold text-emerald-700'>
                        Free Document
                      </h4>
                      <p className='text-sm text-emerald-600'>
                        This document will be shared for free to help the
                        community
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className='flex items-center justify-end gap-4 pt-6 border-t border-gray-200'>
              <button
                type='button'
                onClick={handleClose}
                className='px-6 py-3 border border-gray-200 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium'
              >
                Cancel
              </button>
              <button
                type='submit'
                className='px-8 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl flex items-center gap-2'
              >
                <BookOpenIcon className='w-4 h-4' />
                Share Free Document
              </button>
            </div>
          </form>
        </div>

        {/* Backdrop */}
        <form method='dialog' className='modal-backdrop bg-black/50'>
          <button onClick={handleClose}>close</button>
        </form>
      </dialog>
    </>
  );
}
